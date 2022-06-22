<script type="ts">
  import Question from '$lib/Question.svelte'
  import QuestionGroup from '$lib/QuestionGroup.svelte'
  import AddItemButton from '$lib/AddItemButton.svelte'
  import { things, thingQuestions } from './_stores'

  function addThing() {
    $things = [
      ...$things,
      {
        foo: '',
        baz: '',
        color: '',
      },
    ]
  }
  function removeThing(index: number) {
    const copy = $things
    copy.splice(index, 1)
    $things = copy
  }
</script>

<h2>Step 3</h2>
{#each $things as thing, index}
  <QuestionGroup
    title={`Thing ${index + 1}`}
    onRemove={index === 0 ? undefined : () => removeThing(index)}
  >
    <Question bind:value={thing.foo} {...$thingQuestions.foo} {index} />
    <Question bind:value={thing.baz} {...$thingQuestions.baz} {index} />
    <Question bind:value={thing.color} {...$thingQuestions.color} {index} />
  </QuestionGroup>
{/each}
<AddItemButton onClick={addThing}>Add Thing</AddItemButton>
