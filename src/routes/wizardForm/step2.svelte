<script type="ts">
  import Question from '$lib/Question.svelte'
  import { questions, fields } from './_stores'
</script>

<h2>Step 2</h2>
<Question bind:value={$fields.color} {...$questions.color} />
<Question bind:value={$fields.comment} {...$questions.comment} />
