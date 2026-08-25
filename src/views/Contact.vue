<template>
  <section class="contact">
    <div class="site-container">
      <div class="contact-shell">
        <p class="contact-eyebrow">Contact</p>
        <h2 class="contact-title">Let’s work together.</h2>
        <p class="contact-text">
          For UI/UX design, product interfaces, and thoughtful digital experiences.
        </p>

        <div class="contact-links">
          <a
            href="mailto:nithinsubhash01@gmail.com"
            class="contact-link contact-link-primary interactive"
          >
            nithinsubhash01@gmail.com
          </a>
          <a
            href="https://dribbble.com/_n1th1n"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link interactive"
          >
            Dribbble profile <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div v-if="messageText" class="message-display">
          {{ messageText }}
        </div>

        <form class="contact-form" @submit.prevent="submitForm">
          <input
            v-model="form.name"
            type="text"
            placeholder="Name"
            required
            class="form-input"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
            class="form-input"
          />
          <textarea
            v-model="form.message"
            placeholder="Tell me about your project"
            rows="5"
            required
            class="form-input"
          ></textarea>
          <button
            type="submit"
            class="submit-btn interactive"
            :disabled="isSubmitting"
          >
            {{ submitText }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from "vue";

const CONTACT_EMAIL = "nithinsubhash01@gmail.com";

const isSubmitting = ref(false);
const submitText = ref("Send Message");
const messageText = ref(null);
let statusTimer = null;

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const resetForm = () => {
  form.name = "";
  form.email = "";
  form.message = "";
};

const clearStatusTimer = () => {
  if (statusTimer) {
    clearTimeout(statusTimer);
    statusTimer = null;
  }
};

const resetUiState = () => {
  submitText.value = "Send Message";
  isSubmitting.value = false;
  messageText.value = null;
};

const submitForm = async () => {
  clearStatusTimer();
  isSubmitting.value = true;
  submitText.value = "Sending...";
  messageText.value = null;

  const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
  const body = encodeURIComponent(
    `${form.message}\n\nReply to: ${form.email}`,
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  submitText.value = "Opening email...";
  messageText.value = "Your email app should open with the message ready to send.";
  resetForm();
  statusTimer = setTimeout(resetUiState, 3000);
};

onBeforeUnmount(() => {
  clearStatusTimer();
});
</script>

<style scoped>
.contact {
  padding: 5.5rem 0;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.contact::before {
  content: "";
  position: absolute;
  top: -50%;
  left: 50%;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
  transform: translateX(-50%);
}

.contact-shell {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: slideInUp 0.8s ease-out 0.1s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-eyebrow {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
}

.contact-title {
  margin-top: 0.9rem;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  background: linear-gradient(
    135deg,
    var(--text-primary) 0%,
    var(--gold-light) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-text {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.contact-link {
  padding: 0.68rem 1rem;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--bg-surface) 0%,
    rgba(26, 26, 26, 0.5) 100%
  );
  border: 1.5px solid var(--gold-border);
  color: var(--gold);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contact-link-primary {
  background: var(--gold);
  color: var(--bg-primary);
  border-color: var(--gold);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-top: 2rem;
}

.form-input {
  width: 100%;
  padding: 1rem 1.1rem;
  border: 1.5px solid var(--gold-border);
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    var(--bg-surface) 0%,
    rgba(26, 26, 26, 0.5) 100%
  );
  color: var(--text-primary);
  font-size: 0.98rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: var(--text-secondary);
}

.form-input:focus {
  outline: none;
  border-color: var(--gold);
  background: linear-gradient(
    135deg,
    rgba(26, 26, 26, 0.8) 0%,
    rgba(26, 26, 26, 0.4) 100%
  );
  box-shadow: 0 0 24px rgba(212, 175, 55, 0.2);
}

.submit-btn {
  align-self: center;
  min-width: 180px;
  padding: 0.95rem 1.25rem;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  color: var(--bg-primary);
  font-size: 0.95rem;
  font-family: inherit;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(212, 175, 55, 0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message-display {
  margin-top: 1.5rem;
  color: var(--text-secondary);
  animation: slideInUp 0.6s ease-out;
}

@media (hover: hover) and (pointer: fine) {
  .contact-link:hover {
    transform: translateY(-4px);
    border-color: var(--gold);
    background: linear-gradient(
      135deg,
      rgba(26, 26, 26, 0.9) 0%,
      rgba(26, 26, 26, 0.6) 100%
    );
  }

  .contact-link-primary:hover {
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
  }
}
</style>
