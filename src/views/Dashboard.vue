<template>
  <div>
     <div class="relative px-6 pt-14 lg:px-8">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#d9ff80] to-[#04822a] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
    <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">NARZĘDZIA</h1>
  </div>
  <div class="centered-container">
    <div class="image-row">
      <div class="image-item">
        <img src="/Calendar.png" alt="Kalendarz" class="button-image" />
        <router-link 
            :to="{name:'Kalendarium'}" href="#" class="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800" style="margin-top: 30px;">Kalendarz</router-link>
      </div>
      <div class="image-item">
        <img src="/Lista.png" alt="Lista obecności" class="button-image" />
        <a href="#" class="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800" style="margin-top: 30px;">Lista obecności</a>
      </div>
      <div class="image-item">
        <img src="/Boisko.png" alt="Konspekty" class="button-image" />
        <router-link 
            :to="{name:'Conspect'}" href="#" class="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800" style="margin-top: 30px;">Konspekty</router-link>
      </div>
    </div>
    <div class="absolute inset-x-0 top-[calc(100% - 35rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100% - 40rem)]" aria-hidden="true">
  <div class="relative left-[calc(50% + 23rem)] aspect-[1155/678] w-[44.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d9ff80] to-[#04822a] opacity-30 sm:left-[calc(50% + 44rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
</div>
      </div>
      </div>
    </div>
  </div>
</template>

<style>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.image-row {
  display: flex;
  justify-content: space-between;
}

.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 300px;
  margin: 0 10px;
}

.button-image {
  width: 300px;
  height: 300px;
  max-height: 350px;
}

.button-link {
  margin-top: 50px;
  text-decoration: none;
  color: #333;
}
</style>