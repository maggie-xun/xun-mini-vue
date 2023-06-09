import { computed } from '../computed'
import { reactive } from '../reactive'

describe('computed', () => {
  it('happy path', () => {
      const user = reactive({ age: 1 })
      const age = computed(() => {
          return user.age
      })

      expect(age.value).toBe(1)
  })

    it("should compute lazily", () => {
        const value = reactive({ age: 1 })

        const getter = jest.fn(() => {
            return value.age
        })

        const cValue = computed(getter)

        expect(getter).not.toHaveBeenCalled()

        expect(cValue.value).toBe(1)
        expect(getter).toBeCalledTimes(1)

        // // should not compute again

        cValue.value
        expect(getter).toBeCalledTimes(1)

        // should not compute until needed
        value.age = 2
        expect(getter).toBeCalledTimes(1)

        // now it should compute
        expect(cValue.value).toBe(2)
        expect(getter).toHaveBeenCalledTimes(2)

        // should not compute again
        cValue.value
        expect(getter).toHaveBeenCalledTimes(2)

    })
})
