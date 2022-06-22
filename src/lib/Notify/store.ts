import { writable } from 'svelte/store'

interface ToastProps {
  message: string
  type: 'info' | 'success' | 'error'
  dismissible?: boolean
  timeoutSeconds?: number
}
export const toasts = writable([])

export const addToast = ({
  message,
  type = 'info',
  dismissible = true,
  timeoutSeconds = 3.5,
}: ToastProps): void => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000)

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [
    { id, message, type, dismissible, timeoutSeconds },
    ...all,
  ])

  // If toast is dismissible, dismiss it after "timeoutSeconds" amount of time.
  if (timeoutSeconds) setTimeout(() => dismissToast(id), timeoutSeconds * 1000)
}

export const dismissToast = (id: number): void => {
  toasts.update((all) => all.filter((t) => t.id !== id))
}

export function notifyInfo(message: string) {
  addToast({ message, type: 'info' })
}
export function notifySuccess(message: string) {
  addToast({ message, type: 'success' })
}
export function notifyError(message: string) {
  addToast({ message, type: 'error', timeoutSeconds: -1 })
}
