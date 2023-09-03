<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">

            <div>

                <img class="mx-auto h-12 w-auto" src="/SoccerBall2.png" alt="Your Company" />
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Weryfikacja adresu e-mail</h2>
                <p class="mt-2 text-justify">
                    Dziękujemy za zarejestrowanie się! Zanim zaczniesz zweryfikuj swój adres e-mail, klikając link, który właśnie wysłaliśmy do Ciebie e-mailem? Jeśli nie otrzymałeś wiadomości e-mail, z przyjemnością wyślemy Ci kolejną.
                </p>

            </div>
            
            <form class="mt-8 space-y-6" @submit.prevent="resendVerificationEmail">

                <div>

                <button
                    v-if="!attempt"
                    type="submit"
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Wyślij ponownie e-mail weryfikacyjny
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
                    Wyślij ponownie e-mail weryfikacyjny
                </button>

                </div>
            </form>

        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import Auth from '@/services/Auth'
    import store from '@/store'
    import { LockClosedIcon } from '@heroicons/vue/20/solid'

    const attempt = computed( () => store.getters['system/getAttempt'] )
    const verifTime = computed( () => store.getters['system/getVerifTime'] )
    const verifPerion = computed( () => store.getters['system/getVerifPerion'] )
    const messages = computed( () => store.getters['notify/getMessages'] )

    const router = useRouter()

    const userVerified = computed( () => store.getters['user/getEmailVerifiedAt'] )

    const checkVerifTime = () => {

        if( ! verifTime.value ) return true

        if( ( Date.now() - parseInt( verifTime.value ) ) / 1000 > verifPerion.value ) return true        

        return false

    }

    const timeDifference = () => {

        return verifPerion.value - parseInt( ( Date.now() - parseInt( verifTime.value ) ) / 1000 )

    }

    const resendVerificationEmail = () => {      
        
        if( ! checkVerifTime() ) {

            if( messages.value.length===0 ) {
                store.commit( {
                    type: 'notify/SET_MESSAGES',
                    message: 'Czekaj ' + timeDifference() + ' sekund',
                } )
            }

            return
        }

        store.commit( {
            type: 'system/SET_ATTEMPT',
            attempt: true
        } )

        store.commit( {
            type: 'system/SET_VERIF_TIME',
            time: Date.now()
        } )

        Auth.emailVerificationSend()
        
    }

    const checkUser = () => {

        if( userVerified.value ) {

            router.push( { name: 'Dashboard' } )

            return

        }

    }    

    onMounted( () => {        

        checkUser()

    } )

</script>