<template>
  <div class="flex h-screen flex-col justify-between py-8 px-14">
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="font-medium text-2xl">
          Club <span class="text-indigo-500">TT</span>
        </div>
        <div
          class="ml-4 py-0.5 px-4 bg-indigo-100 rounded text-sm text-indigo-500"
        >
          {{ app_version }}
        </div>
      </div>
      <div>
        <span
          @click="changeLocale('en')"
          :class="[{ [activeLocaleClass]: locale == 'en' }, ' cursor-pointer']"
          >En</span
        >
        |
        <span
          @click="changeLocale('ru')"
          :class="[{ [activeLocaleClass]: locale == 'ru' }, ' cursor-pointer']"
        >
          Ru
        </span>
      </div>
    </div>
    <div class="club_w mx-auto -mt-16">
      <div class="mb-2">{{ $t("chooseClub") }}</div>
      <div class="mb-4">
        <div class="relative">
          <input
            type="text"
            class="
              bg-gray-50
              border border-gray-300
              rounded
              focus:ring-indigo-500 focus:border-indigo-500
              w-full
              px-4
              py-2
              pr-16
            "
            placeholder="Поиск пока не пригодится"
          />
          <dir
            class="
              absolute
              flex
              items-center
              justify-center
              right-6
              -top-1.5
              w-6
            "
          >
            <SearchSvg class="cursor-pointer" />
          </dir>
        </div>
        <!-- <div>Значок поиска</div> -->
      </div>
      <div v-if="clubs.length">
        <div
          v-for="club in clubs"
          :key="club.id"
          class="
            flex
            justify-between
            cursor-pointer
            bg-indigo-100
            rounded
            px-4
            py-2
            mb-3
            shadow-lg shadow-indigo-100/50
          "
          @click="chooseClub(club.id)"
        >
          <div class="text-indigo-500">{{ club.name }}</div>
          <ArrowRight1Svg class="fill-indigo-500" />
        </div>
      </div>
      <template v-else> Загрузка клубов... </template>
    </div>
    <div class="underline cursor-pointer mx-auto">О приложении</div>
  </div>
</template>

<script>
import ArrowRight1Svg from "../../components/svg/ArrowRight1Svg.vue";
import SearchSvg from "../../components/svg/SearchSvg.vue";

export default {
  components: {
    ArrowRight1Svg,
    SearchSvg,
  },
  data() {
    return {
      app_version: __APP_VERSION__,
      activeLocaleClass: "text-indigo-500",
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    clubs() {
      return this.$store.state.clubs;
    },
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
    chooseClub(idClub) {
      // SET REPLACE
      this.$router.push({ name: "Club", params: { id: idClub } });
    },
  },
  mounted() {
    this.$store.dispatch("getClubs");
  },
};
</script>

<style scoped>
.club_w {
  min-width: 32rem;
}
</style>