<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="/SoccerBall2.png" alt="Your Company" />
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Zapomniałeś/aś hasło</h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Zapomniałeś/aś hasła? Nic się nie stało. Wystarczy, że podasz nam swój adres e-mail, a wyślemy Ci link do resetowania hasła, który umożliwi Ci utworzenie nowego.
                </p>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="forgotPassword">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">Adres e-mail</label>
                        <input
                            id="email-address"
                            type="email"
                            v-model="formData.email"
                            autocomplete="email"
                            required="true"
                            class="relative block w-full appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            :class="[errors.length>0 && !formData.email ? 'empty-field' : '']"
                            placeholder="Adres e-mail" 
                        />
                    </div>
                </div>

                <div>
                <button
                    v-if="!attempt"
                    type="submit"
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    WYŚLIJ LINK RESETUJĄCY HASŁO
                </button>

                <button
                    v-else
                    disabled="true"
                    type="button"
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-green-300 py-2 px-4 text-sm font-medium text-white"
                >
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
                    </span>
                    WYŚLIJ LINK RESETUJĄCY HASŁO
                </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed  } from 'vue'
    import store from '@/store'
    import Auth from '@/services/Auth'
    import { LockClosedIcon } from '@heroicons/vue/20/solid'

    const formData = ref( {
        email: null
    } )

    const attempt = computed( () => store.getters['system/getAttempt'] )

    const errors = ref( [] )

    const forgotPassword = () => {

        errors.value = []

        if( ! formData.value.email ) {
            errors.value.push( 'Podaj adres e-mail' )
            return
        }

        store.commit( {
            type: 'system/SET_ATTEMPT',
            attempt: true
        } )

        Auth.forgotPasswordSend( {
            email: formData.value.email
        } )

    }

</script>