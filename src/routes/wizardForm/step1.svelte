<script type="ts">
  import Question from '$lib/Question.svelte'
  import Sum from '$lib/Sum.svelte'
  import { fields, questions } from './_stores'

  $: if (!$fields.bool) $fields.number1 = $fields.number2 = null
</script>

<h2>Step 1</h2>
<Question
  help="I am the help text"
  bind:value={$fields.name}
  {...$questions.name}
/>
<Question bind:value={$fields.phone} {...$questions.phone} />
<Question bind:value={$fields.date} {...$questions.date} />
<Question bind:value={$fields.bool} {...$questions.bool} />
{#if $fields.bool}
  <Question bind:value={$fields.number1} {...$questions.number1} />
  <Question bind:value={$fields.number2} {...$questions.number2} />
  <Sum
    label="Sum Field"
    help="Above numbers must total 100!"
    fields={[$fields.number1, $fields.number2]}
    min={100}
    max={100}
  />
{/if}
