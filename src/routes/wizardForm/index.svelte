<script type="ts">
  import Wizard from '$lib/Wizard.svelte'
  import Pre from '$lib/Pre.svelte'
  import { notifySuccess } from '$lib/Notify/store'
  import StepOne from './step1.svelte'
  import StepTwo from './step2.svelte'
  import StepThree from './step3.svelte'
  const steps = [StepOne, StepTwo, StepThree]
  import { step, submitData } from './_stores'

  let submitted = false

  function onSave() {
    notifySuccess('Data Saved')
  }
  function onSubmit() {
    submitted = true
    notifySuccess('Data Submitted')
  }
</script>

<h1>Wizard Form</h1>

{#if submitted}
  <h2>Submitted Data:</h2>
{:else}
  <Wizard {step} {steps} {onSave} {onSubmit} />
  <h2>Form State :</h2>
{/if}

<Pre data={$submitData} />
