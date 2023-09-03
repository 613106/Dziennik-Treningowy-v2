<template>
    <div class="relative px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#d9ff80] to-[#04822a] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        </div>
        </div>
        </div>
    <div class="container">
      <div class="calendar">
        <div class="month">
          <img
      class="icon-button"
      src="/lewo.png"
      alt="Previous Month"
      @click="prevMonth"
    />
    <div class="date">
      <h1>{{ currentMonth }}</h1>
    </div>
    <img
      class="icon-button"
      src="/prawo.png"
      alt="Next Month"
      @click="nextMonth"
    />
        </div>
        <div class="weekdays">
          <div>Ndz</div>
          <div>Pon</div>
          <div>Wt</div>
          <div>Śr</div>
          <div>Czw</div>
          <div>Pt</div>
          <div>Sob</div>
        </div>
        <div class="days">
          <div
            v-for="day in days"
            :key="day"
            :class="{ 'prev-date': isPrevDate(day), 'today': isToday(day) }"
          >
            {{ day }}
          </div>
        </div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d9ff80] to-[#04822a] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        date: new Date(),
      };
    },
    computed: {
      currentMonth() {
        const months = [
          "Styczeń",
          "Luty",
          "Marzec",
          "Kwiecień",
          "Maj",
          "Czerwiec",
          "Lipiec",
          "Sierpień",
          "Wrzesień",
          "Październik",
          "Listopad",
          "Grudzień",
        ];
        return months[this.date.getMonth()];
      },
      days() {
        const firstDayIndex = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          1
        ).getDay();
        const lastDay = new Date(
          this.date.getFullYear(),
          this.date.getMonth() + 1,
          0
        ).getDate();
        const daysArray = [];
  
        for (let x = firstDayIndex; x > 0; x--) {
          daysArray.push("");
        }
  
        for (let i = 1; i <= lastDay; i++) {
          daysArray.push(i);
        }
  
        return daysArray;
      },
    },
    methods: {
    isPrevDate(day) {
      return day === "" ? true : false;
    },
    isToday(day) {
      const currentDate = new Date();
      return (
        day === currentDate.getDate() &&
        this.date.getMonth() === currentDate.getMonth()
      );
    },
    prevMonth() {
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth() - 1,
        1
      );
    },
    nextMonth() {
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        1
      );
    },
    renderCalendar() {
      const firstDayIndex = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        1
      ).getDay();
      const lastDay = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate();
      const daysArray = [];

      for (let x = firstDayIndex; x > 0; x--) {
        daysArray.push("");
      }

      for (let i = 1; i <= lastDay; i++) {
        daysArray.push(i);
      }

      this.days = daysArray;
    },
  },
  watch: {
    date() {
      this.renderCalendar();
    },
  },
};
</script>

<style scoped>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Quicksand", sans-serif;
  }
  
  html {
    font-size: 62.5%;
  }
  
  .container {
    width: 100%;
    height: 100vh;
    color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .calendar {
    width: 45rem;
    height: 52rem;
    background-color: #222227;
    box-shadow: 0 0.5rem 3rem rgba(0, 0, 0, 0.4);
  }
  
  .month {
    width: 100%;
    height: 12rem;
    background-color: #166534;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    text-align: center;
    text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  }
  
  .month i {
    font-size: 2.5rem;
    cursor: pointer;
  }
  
  .month h1 {
    font-size: 3rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    margin-bottom: 1rem;
  }
  
  .month p {
    font-size: 1.6rem;
  }
  
  .weekdays {
    width: 100%;
    height: 5rem;
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
  }
  
  .weekdays div {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    width: calc(44.2rem / 7);
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  }
  
  .days {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0.2rem;
  }
  
  .days div {
    font-size: 1.4rem;
    margin: 0.3rem;
    width: calc(40.2rem / 7);
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    transition: background-color 0.2s;
  }
  
  .days div:hover:not(.today) {
    background-color: #262626;
    border: 0.2rem solid #777;
    cursor: pointer;
  }
  
  .prev-date,
  .next-date {
    opacity: 0.5;
  }
  
  .today {
    background-color: #166534;
  }
  .icon-button {
  cursor: pointer;
  width: 48px;
  height: 48px;
}
</style>