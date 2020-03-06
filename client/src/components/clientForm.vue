<template>
  <form novalidate class="md-layout" @submit.prevent="validateForm">

    <md-button type="submit" class="md-fab md-primary button-top" :disabled="sending">
      <md-icon>save</md-icon>
    </md-button>

    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">{{title}}</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('firstName')">
              <label for="first-name">Nombre</label>
              <md-input name="first-name" id="first-name" v-model="form.firstName" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.firstName.required">Este campo es obligatorio.</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('lastName')">
              <label for="last-name">Apellido</label>
              <md-input name="last-name" id="last-name" v-model="form.lastName" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.lastName.required">Este campo es obligatorio.</span>
              <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('phone')">
              <label for="phone">Celular</label>
              <md-input name="phone" id="phone" v-model="form.phone" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.phone.required">Este campo es obligatorio.</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('gender')">
              <label for="gender">Género</label>
              <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                <md-option></md-option>
                <md-option value="M">Mujer</md-option>
                <md-option value="H">Hombre</md-option>
              </md-select>
              <span class="md-error">Este campo es obligatorio.</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('email')">
              <label for="first-email">Email</label>
              <md-input name="email" id="email" v-model="form.email" :disabled="sending" />
              <span class="md-error">Email mal escrito.</span>
            </md-field>
          </div>

          <md-field>
            <label>Notas</label>
            <md-textarea name="description" id="description" v-model="form.description"></md-textarea>
          </md-field>

        </div>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

    </md-card>

  </form>
</template>

<script>
  import ClientService from '@/services/ClientService'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email
  } from 'vuelidate/lib/validators'

  export default {
    name: 'ClientForm',
    mixins: [validationMixin],
    data: () => ({
      title: 'Nuevo Cliente',
      form: {
        firstName: null,
        lastName: null,
        phone: null,
        gender: null,
        email: null,
        description: null
      },
      sending: false
    }),
    mounted () {
      this.$emit('on-mounted-events', 'Cliente')
      if (this.$route.params.id) {
        this.title = 'Modificar Cliente'
        this.getClient()
        .then((client) => {
          this.form.firstName = client.firstName
          this.form.lastName = client.lastName
          this.form.phone = client.phone
          this.form.gender = client.gender
          this.form.email = client.email
          this.form.description = client.description
          this.form.id = this.$route.params.id
        })
      }
    },
    methods: {
      async getClient () {
        const response = await ClientService.getClient({ id: this.$route.params.id })
        return response.data
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      saveForm () {
        this.sending = true
        if (this.form.id) {
          ClientService.updateClient(this.form).then(() => {
            this.sending = false
            this.$router.push({ name: 'ClientDetails', params: { id: this.form.id, saved: true } })
          })
        } else {
          ClientService.addClient(this.form).then(() => {
            this.sending = false
            this.$router.push({ name: 'Clients', params: { saved: true } })
          })
        }
      },
      validateForm () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveForm()
        }
      }
    },
    validations: {
      form: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        phone: {
          required
        },
        gender: {
          required
        },
        email: {
          email
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
