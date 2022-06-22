<script type="ts">
  import Question from './Question.svelte'
  export let fields: number[] = []
  export let label: string
  export let help: string = null
  export let min = 0
  export let max: number = Number.MAX_SAFE_INTEGER

  function sum(a: number[]) {
    return a.reduce((t, n) => Number(t) + Number(n), 0)
  }

  function getPrecision(n: number) {
    if (String(n).match(/[^.\d]/)) return 0
    const decimal = [...Array(String(n).split('.')[1]?.length || 0)]
      .map((_item, idx) => (idx === 0 ? 1 : 0))
      .reverse()
      .join('')
    return decimal ? Number('.' + decimal) : 0
  }

  function getStep(ary: number[] = []) {
    return ary.reduce((step, n) => {
      let nStep = getPrecision(n)
      return String(nStep).length > String(step).length ? nStep : step
    }, 0)
  }
</script>

<Question
  {label}
  {help}
  value={sum(fields)}
  props={{
    type: 'sum',
    min,
    max,
    step: getStep([min, max, ...fields]),
  }}
/>
