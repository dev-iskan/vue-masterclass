<template lang="pug">
  form(@submit.prevent="save")
    .form-group
      label(for="thread_title") Title:
      input.form-input(v-model="form.title" type="text" id="thread_title" name="title")
    .form-group
      label(for="thread_content") Content:
      textarea.form-input(v-model="form.text" id="thread_content" name="content" rows="8" cols="140")
    .btn-group
      button.btn.btn-ghost(@click.prevent="cancel") Cancel
      button.btn.btn-blue(type="submit" name="Publish") {{isUpdate ? 'Update' : 'Publish'}}
    </div>
  </form>
</template>

<script>
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
  computed: {
    isUpdate () {
      return !!this.title
    }
  },
  methods: {
    save () {
      this.$emit('save', { title: this.form.title, text: this.form.text })
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
 <style scoped>
 </style>
