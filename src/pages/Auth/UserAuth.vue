<template>
  <div>
    <base-dialog
      :show="!!error"
      title="A Error Occourred!"
      @close="errorHandler"
      >{{ error }}</base-dialog
    >
    <base-dialog
      :show="isLoading"
      fixed
      :title="mode === 'login' ? 'Logging...' : 'Registering...'"
    >
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <p v-if="!isFormValid" :class="{ errors: !isFormValid }">
          Please Enter a valid Email and password must be at least have 6
          characters long.
        </p>
        <div>
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">{{
            switchModeButtonCaption
          }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseDialog from '../../components/ui/BaseDialog.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
export default {
  components: { BaseDialog, BaseSpinner },
  data() {
    return {
      email: '',
      password: '',
      isFormValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Register';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Register instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    async submitForm() {
      this.isFormValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.isFormValid = false;
        return;
      }
      //send http request
      if (this.mode === 'login') {
        this.isLoading = true;
        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
          this.$router.replace('/coaches');
        } catch (error) {
          this.error = error.message || 'Failed to Login';
        }
        this.isLoading = false;
      } else {
        this.isLoading = true;
        try {
          await this.$store.dispatch('register', {
            email: this.email,
            password: this.password,
          });
          this.$router.replace('/coaches');
        } catch (error) {
          this.error = error.message || 'Failed to register';
        }
        this.isLoading = false;
      }
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'register';
      } else {
        this.mode = 'login';
      }
    },
    errorHandler() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 10px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
