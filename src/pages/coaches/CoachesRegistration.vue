<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occourred!"
      @close="errorHandler"
    >
      {{ error }}
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <section>
      <base-card>
        <h2>Register a Coach Now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import BaseCard from '../../components/ui/BaseCard.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
export default {
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  components: {
    CoachForm,
    BaseCard,
    BaseDialog,
    BaseSpinner,
  },
  methods: {
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/registerCoach', data);
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Failed To Register';
      }
      this.isLoading = false;
    },
    errorHandler() {
      this.error = null;
    },
  },
};
</script>
