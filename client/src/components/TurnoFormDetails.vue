<template>
  <form novalidate class="md-layout" @submit.prevent="validateForm">
    <md-card class="md-layout-item md-small-size-100">
      <md-card-header>
        <div class="md-title">Detalles del turno</div>
      </md-card-header>

      <div class="md-layout md-gutter">
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
        <md-field>
          <label>Notas</label>
          <md-textarea name="description" id="description" v-model="form.description"></md-textarea>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />

    </md-card>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'TurnoFormDetails',
  mounted () {
    // if (this.$route.params.idclient) this.getClient()
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      gender: null
    },
    sending: false
  }),
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    }
  },
  validateForm () {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      this.saveForm()
    }
  },
  validations: {
    form: {
      gender: {
        required
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
