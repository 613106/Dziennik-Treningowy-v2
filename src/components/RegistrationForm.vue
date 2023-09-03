<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="/SoccerBall2.png" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Zarejestruj nowe konto</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          lub
          {{ ' ' }}
          <router-link 
            :to="{name:'Logowanie'}"
            class="font-medium text-green-300 hover:text-green-900"
          >
            Zaloguj się
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="-space-y-px rounded-md shadow-sm">
            <div>
                <label for="name" class="sr-only">Imię i Nazwisko</label>
                <input
                    id="name"
                    type="text"
                    v-model="formData.name"
                    required="true"
                    class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    :class="[errors.length>0 && !formData.name ? 'empty-field' : '']"
                    placeholder="Imię i Nazwisko" 
                />
            </div>
            <div>
                <label for="email-address" class="sr-only">Adres e-mail</label>
                <input
                    id="email-address"
                    type="email"
                    v-model="formData.email"
                    required="true"
                    class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    :class="[errors.length>0 && !formData.email ? 'empty-field' : '']"
                    placeholder="Adres e-mail" 
                />
            </div>
            <div>
                <label for="password" class="sr-only">Hasło</label>
                <input
                    id="password"
                    type="password"
                    v-model="formData.password"              
                    required="true"
                    class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    :class="[errors.length>0 && !formData.password ? 'empty-field' : '']"
                    placeholder="Hasło" 
                />
            </div>
            <div>
                <label for="password_confirmation" class="sr-only">Potwierdzenie hasła</label>
                <input
                    id="password_confirmation"
                    type="password"
                    v-model="formData.password_confirmation"              
                    required="true"
                    class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    :class="[errors.length>0 && !formData.password_confirmation ? 'empty-field' : '']"
                    placeholder="Potwierdzenie hasła" 
                />
            </div>
        </div>

        <div>

          <button
            v-if="!attempt"
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-green-900 py-2 px-4 text-sm font-medium text-white hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
          >
            Rejestracja
          </button>

          <button
            v-else
            disabled="true"
            type="button"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-green-300 py-2 px-4 text-sm font-medium text-white"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-green-900" aria-hidden="true" />
            </span>
            Rejestracja
          </button>

        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import store from '@/store'
  import Auth from '@/services/Auth'
  import { LockClosedIcon } from '@heroicons/vue/20/solid'

  const attempt = computed( () => store.getters['system/getAttempt'] )

  const formData = ref( {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  } )

  const errors = ref( [] )

  const register = () => {

      errors.value = []

      // validation
      if( ! formData.value.name ) errors.value.push( 'Podaj imię i nazwisko' )
      if( ! formData.value.email ) errors.value.push( 'Podaj e-mail' )
      if( ! formData.value.password ) errors.value.push( 'Podaj hasło' )
      if( ! formData.value.password_confirmation ) errors.value.push( 'Potwierdź swoje hasło' )
      if( 
          formData.value.password && 
          formData.value.password_confirmation &&
          formData.value.password !== formData.value.password_confirmation
      ) {
          errors.value.push( 'Hasło i potwierdzenie hasła nie zgadzają się!' )
      }

      Auth.register( formData.value )

      store.commit( {
        type: 'system/SET_ATTEMPT',
        attempt: true
      } )

  }

</script>