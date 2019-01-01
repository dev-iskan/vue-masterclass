<template lang="pug">
  form(@submit.prevent="save")
    .form-group
      label(for="thread_title") Title:
      input.form-input(v-model="form.title" @blur="$v.form.title.$touch()" type="text" id="thread_title" name="title")
      template(v-if="$v.form.title.$error")
        span.form-error(v-if="!$v.form.title.required") Thread must have a title
        span.form-error(v-if="!$v.form.title.minLength") The title must be least 10 characters long
    .form-group
      label(for="thread_content") Content:
      textarea.form-input(v-model="form.text" @blur="$v.form.text.$touch()" id="thread_content" name="content" rows="8" cols="140")
      template(v-if="$v.form.text.$error")
        span.form-error(v-if="!$v.form.text.required") Thread must have some content
        span.form-error(v-if="!$v.form.text.minLength") The text of the thread must be least 40 characters long. Type at least {{40 - form.text.length}} more
    .btn-group
      button.btn.btn-ghost(@click.prevent="cancel") Cancel
      button.btn.btn-blue(type="submit" name="Publish") {{isUpdate ? 'Update' : 'Publish'}}
    </div>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(10)
      },
      text: {
        required,
        minLength: minLength(40)
      }
    }
  },
  computed: {
    isUpdate () {
      return !!this.title
    }
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$emit('save', { title: this.form.title, text: this.form.text })
      }
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
 <style scoped>
 </style>
