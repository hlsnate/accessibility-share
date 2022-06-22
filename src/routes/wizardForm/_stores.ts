// svelte docs: "object literal keys are guaranteed not to conflict in any circumstance"
import { derived, readable, writable } from 'svelte/store'
// import type {Question} from '$lib/Question.svelte'

export const step = writable(1)

export const fields = writable({
  name: 'Jimmie',
  phone: '1234560007',
  date: '',
  bool: false,
  color: '',
  number1: null,
  number2: null,
  comment: '',
})
export const things = writable([
  {
    foo: 'Yes',
    baz: 'No',
    color: 'red',
  },
])
export const submitData = derived([fields, things], ([$fields, $things]) => {
  return {
    fields: {
      ...$fields,
      things: $things,
    },
  }
})

function noActionReadableStart() {
  return () => {
    /* no-action stop returned */
  }
}

export const questions = readable(
  {
    phone: {
      name: 'phone',
      label: 'Phone',
      help: 'Call for help!',
      props: {
        type: 'tel',
        pattern: '[0-9]{10}',
        placeholder: '##########'
      }
    },
    name: {
      name: 'name',
      label: 'Name',
      // error: 'Fake error here!',
      props: {
        minlength: 2,
        maxlength: 10,
      },
    },
    date: {
      name: 'date',
      label: 'When',
      props: {
        type: 'date',
        min: '2022-05-04',
        max: '2022-05-20',
      },
    },
    bool: {
      name: 'bool',
      label: 'Yes, I want to add two numbers together',
      props: {
        type: 'checkbox',
        required: false,
      },
    },
    color: {
      name: 'color',
      label: 'Favorite color',
      props: {
        type: 'select',
      },
      options: ['red', 'green', 'yellow', 'blue'],
    },
    number1: {
      name: 'number1',
      label: 'Number One',
      props: {
        min: 1,
        max: 99,
        step: 0.5,
        type: 'number',
      },
    },
    number2: {
      name: 'number2',
      label: 'Number Two',
      props: {
        min: 5,
        max: 42,
        step: 0.5,
        type: 'number',
      },
    },
    comment: {
      name: 'comment',
      label: 'Comment',
      props: {
        minlength: 5,
        maxlength: 42,
        type: 'textarea',
        required: false,
        placeholder:
          'Not required, but must be between 5 & 42 characters if used',
      },
    },
  },
  noActionReadableStart
)

export const thingQuestions = readable(
  {
    color: {
      name: 'color',
      label: 'Favorite color',
      props: {
        type: 'select',
      },
      options: ['red', 'green', 'yellow', 'blue'],
    },
    foo: {
      name: 'foo',
      label: 'Foo',
    },
    baz: {
      name: 'baz',
      label: 'Baz',
    },
  },
  noActionReadableStart
)
