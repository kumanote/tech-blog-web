<script setup lang="ts">
  import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  const dictionaryEn = {
    A: '・－',
    B: '－・・・',
    C: '－・－・',
    D: '－・・',
    E: '・',
    F: '・・－・',
    G: '－－・',
    H: '・・・・',
    I: '・・',
    J: '・－－－',
    K: '－・－',
    L: '・－・・',
    M: '－－',
    N: '－・',
    O: '－－－',
    P: '・－－・',
    Q: '－－・－',
    R: '・－・',
    S: '・・・',
    T: '－',
    U: '・・－',
    V: '・・・－',
    W: '・－－',
    X: '－・・－',
    Y: '－・－－',
    Z: '－－・・',
    1: '・－－－－',
    2: '・・－－－',
    3: '・・・－－',
    4: '・・・・－',
    5: '・・・・・',
    6: '－・・・・',
    7: '－－・・・',
    8: '－－－・・',
    9: '－－－－・',
    0: '－－－－－',
    '.': '・－・－・－',
    ',': '－－・・－－',
    ':': '－－－・・・',
    '?': '・・－－・・',
    _: '・・－－・－',
    '+': '・－・－・',
    '-': '－・・・・－',
    '*': '－・・－',
    '^': '・・・・・・',
    '/': '－・・－・',
    '@': '・－－・－・',
    '(': '－・－－・',
    ')': '－・－－・－',
    '"': '・－・・－・',
    "'": '・－－－－・',
    '=': '－・・・－',
    delete: '・・・・・・・・',
    va: '・・・－・－',
  }
  const dictionaryJa = {
    イ: '・－',
    ロ: '・－・－',
    ハ: '－・・・',
    ニ: '－・－・',
    ホ: '－・・',
    ヘ: '・',
    ト: '・・－・・',
    チ: '・・－・',
    リ: '－－・',
    ヌ: '・・・・',
    ル: '－・－－・',
    ヲ: '・－－－',
    ワ: '－・－',
    カ: '・－・・',
    ヨ: '－－',
    タ: '－・',
    レ: '－－－',
    ソ: '－－－・',
    ツ: '・－－・',
    ネ: '－－・－',
    ナ: '・－・',
    ラ: '・・・',
    ム: '－',
    ウ: '・・－',
    ヰ: '・－・・－',
    ノ: '・・－－',
    オ: '・－・・・',
    ク: '・・・－',
    ヤ: '・－－',
    マ: '－・・－',
    ケ: '－・－－',
    フ: '－－・・',
    コ: '－－－－',
    エ: '－・－－－',
    テ: '・－・－－',
    ア: '－－・－－',
    サ: '－・－・－',
    キ: '－・－・・',
    ユ: '－・・－－',
    メ: '－・・・－',
    ミ: '・・－・－',
    シ: '－－・－・',
    ヱ: '・－－・・',
    ヒ: '－－・・－',
    モ: '－・・－・',
    セ: '・－－－・',
    ス: '－－－・－',
    ン: '・－・－・',
    '゛': '・・',
    '゜': '・・－－・',
    ー: '・－－・－',
    '、': '・－・－・－',
    '」': '・－・－・・',
    '（': '－・－－・－',
    '）': '・－・・－・',
    delete: '・・・－・',
    va: '・・・－・－',
  }
  const dictionary = {
    en: dictionaryEn,
    ja: dictionaryJa,
  }
  class Morse {
    _lang: string
    constructor(lang: string) {
      this._lang = lang
    }

    get lang() {
      return this._lang
    }

    set lang(lang) {
      this._lang = lang
    }

    get dictionary() {
      switch (this.lang) {
        case 'ja':
          return dictionaryJa
        default:
          return dictionaryEn
      }
    }

    decode(sequence: string) {
      const dict = this.dictionary
      for (const [key, value] of Object.entries(dict)) {
        if (value === sequence) {
          return key
        }
      }
      return undefined
    }
  }
  const isJa = ref(false)
  const currentSequence = ref('')
  const sentence = ref('')
  const beep = ref(false)
  const beepStartTime = ref<number | null>(null)
  const beepEndTime = ref<number | null>(null)
  const osc = ref<OscillatorNode | null>(null)
  const btnEventType = ref<string | null>(null)

  const morse = computed(() => {
    return isJa.value ? new Morse('ja') : new Morse('en')
  })
  const title = 'モールス符号練習'
  const description = 'モールス符号を打って練習することができます。'
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:url',
        content: 'https://blog.kumano-te.com/tools/morse',
      },
    ],
  })
  const checkSequences = () => {
    if (beep.value || beepEndTime.value === null) return false
    const checkTime = new Date().getTime() - beepEndTime.value
    if (checkTime < 500) return false
    const decoded = morse.value.decode(currentSequence.value)
    currentSequence.value = ''
    if (decoded !== undefined) {
      if (decoded === 'va') {
        sentence.value = ''
      } else if (decoded === 'delete') {
        if (sentence.value.length > 0) {
          sentence.value = sentence.value.substr(0, sentence.value.length - 1)
        }
      } else {
        sentence.value += decoded
      }
    } else {
      sentence.value += 'x'
    }
  }
  const startBeep = () => {
    if (beep.value && osc.value !== null) {
      osc.value.stop()
    }
    beep.value = true
    beepStartTime.value = new Date().getTime()
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = ctx.createOscillator()
    oscillator.type = 'square'
    oscillator.connect(ctx.destination)
    osc.value = oscillator
    osc.value.start()
  }
  const endBeep = () => {
    if (!beep.value || osc.value === null) return
    beep.value = false
    osc.value.stop()
    if (beepStartTime.value) {
      const beepTime = new Date().getTime() - beepStartTime.value
      let char = ''
      if (beepTime < 250) {
        char = '・'
      } else {
        char = '－'
      }
      currentSequence.value += char
      beepStartTime.value = null
      beepEndTime.value = new Date().getTime()
      setTimeout(checkSequences, 500)
    }
  }
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      startBeep()
    }
  }
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      endBeep()
    }
  }
  const onButtonMouseUp = (event: MouseEvent) => {
    if (btnEventType.value === null) {
      btnEventType.value = 'mouse'
    } else if (btnEventType.value !== 'mouse') {
      event.preventDefault()
      return false
    }
    startBeep()
  }
  const onButtonMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    if (btnEventType.value !== 'mouse') {
      return false
    }
    endBeep()
  }
  const onButtonTouchStart = (event: TouchEvent) => {
    event.preventDefault()
    if (btnEventType.value === null) {
      btnEventType.value = 'touch'
    } else if (btnEventType.value !== 'touch') {
      event.preventDefault()
      return false
    }
    startBeep()
  }
  const onButtonTouchEnd = (event: TouchEvent) => {
    if (btnEventType.value !== 'touch') {
      event.preventDefault()
      return false
    }
    endBeep()
  }
  onMounted(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    const btn = window.document.getElementById('input-btn')
    if (btn) {
      // PC対応
      btn.addEventListener('mousedown', onButtonMouseUp, false)
      btn.addEventListener('mouseup', onButtonMouseDown, false)
      // スマホ対応
      btn.addEventListener('touchstart', onButtonTouchStart, false)
      btn.addEventListener('touchend', onButtonTouchEnd, false)
    }
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('keyup', onKeyUp)
  })
</script>

<template>
  <section class="py-8 sm:py-12 lg:py-16">
    <div class="container">
      <div class="text-center">
        <h2
          class="text-base font-semibold tracking-wider text-primary-600 uppercase"
        >
          TOOL
        </h2>
        <p
          class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-4xl"
        >
          Morse符号練習
        </p>
      </div>
      <div class="mt-12 mx-auto sm:max-w-2xl">
        <div
          class="bg-white shadow-lg shadow-zinc-800/5 overflow-hidden sm:rounded-lg dark:bg-zinc-800/90 dark:shadow-zinc-400/5"
        >
          <div
            class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between"
          >
            <div>
              <h3
                class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50"
              >
                モールス符号入力
              </h3>
            </div>
            <div>
              <SwitchGroup as="div" class="flex items-center">
                <Switch
                  v-model="isJa"
                  :class="[
                    isJa
                      ? 'bg-primary-600 dark:bg-primary-400'
                      : 'bg-gray-200 dark:bg-gray-700',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      isJa ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    ]"
                  />
                </Switch>
                <SwitchLabel as="span" class="ml-4">
                  <span
                    class="text-sm font-medium text-gray-900 dark:text-gray-50"
                    >和文</span
                  >
                </SwitchLabel>
              </SwitchGroup>
            </div>
          </div>
          <div class="px-4 py-5 sm:px-6 space-y-6">
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                入力信号
              </dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-50">
                {{ currentSequence ? currentSequence : '入力待ち...' }}
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                入力文
              </dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-50">
                {{ sentence ? sentence : '未入力' }}
              </dd>
            </div>
            <button
              id="input-btn"
              type="button"
              class="inline-flex items-center px-8 py-2 w-full justify-center border border-transparent text-base font-medium rounded-xl"
            >
              打鍵
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-8 sm:py-12 lg:py-16">
    <div class="container">
      <div>
        <div class="mx-auto sm:max-w-2xl">
          <div class="text-center">
            <h2
              class="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-gray-50"
            >
              使い方
            </h2>
            <p
              class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400"
            >
              打鍵ボタンを押下またはEnterキー押下でモールス信号を入力することができます。<br />
              入力された信号を自動で解析し、文字（欧文または和文）に変換されます。
            </p>
          </div>
          <div class="mt-10">
            <div v-for="(dict, lang) in dictionary" :key="lang">
              <h5
                class="text-sm leading-6 font-bold text-gray-900 dark:text-gray-50"
              >
                {{ lang === 'en' ? '欧文' : '和文' }}
              </h5>
              <div
                class="bg-white dark:bg-gray-800 shadow overflow-hidden lg:rounded-md mb-4"
              >
                <div class="divide-y divide-gray-200 dark:divide-gray-600">
                  <div
                    class="grid grid-cols-2 text-sm font-medium sm:divide-x sm:divide-gray-200 sm:dark:divide-gray-600"
                  >
                    <div
                      class="p-2 text-center text-gray-900 dark:text-gray-50"
                    >
                      文字
                    </div>
                    <div
                      class="p-2 text-center text-gray-900 dark:text-gray-50"
                    >
                      信号
                    </div>
                  </div>
                  <div
                    v-for="(signal, letter) in dict"
                    :key="letter"
                    class="grid grid-cols-2 text-sm font-normal text-gray-700 dark:text-gray-200 sm:divide-x sm:divide-gray-200 sm:dark:divide-gray-600"
                  >
                    <div class="p-2 sm:px-4 text-center">
                      {{
                        letter === 'delete'
                          ? '1字削除'
                          : letter === 'va'
                          ? '終了'
                          : letter
                      }}
                    </div>
                    <div class="p-2 sm:px-4 text-center">
                      {{ signal }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  #input-btn {
    color: #18181b;
    background: #fafafa;
    box-shadow: 0.2em 0.2em 0.4em #bcbcbc, -0.2em -0.2em 0.4em #fff;
    &:active {
      background: linear-gradient(145deg, #fafafa, #f4f4f5);
      box-shadow: inset 0.2em 0.2em calc(0.2em * 2) #52525b,
        inset calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #f4f4f5;
    }
  }
  @media (prefers-color-scheme: dark) {
    #input-btn {
      color: #fafafa;
      background: #18181b;
      box-shadow: 0.2em 0.2em 0.4em #27272a, -0.2em -0.2em 0.4em #000;
      &:active {
        background: linear-gradient(145deg, #18181b, #27272a);
        box-shadow: inset 0.2em 0.2em calc(0.2em * 2) #3f3f46,
          inset calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #27272a;
      }
    }
  }
</style>
