import { ref } from 'vue'
import { on, off } from '@element-plus/utils/dom'
import triggerEvent from '@element-plus/test-utils/trigger-event'
import usePrevent from '../use-prevent'

describe('usePrevent', () => {
  const evtName = 'keydown'
  const evt = jest.fn()
  beforeAll(() => {
    on(document.body, evtName, evt)
  })

  beforeEach(() => {
    evt.mockClear()
  })

  afterAll(() => {
    off(document.body, evtName, evt)
  })

  it('should prevent global event from happening', () => {
    const visible = ref(true)
    const evt2Trigger = jest.fn().mockReturnValue(true)
    usePrevent(visible, evtName, evt2Trigger)

    triggerEvent(document.body, evtName)

    expect(evt).not.toBeCalled()
    expect(evt2Trigger).toHaveBeenCalled()
    visible.value = false
    // clean up
  })

  it('should not prevent global event from happening', () => {
    const visible = ref(true)
    const evt2Trigger = jest.fn().mockReturnValue(false)
    usePrevent(visible, evtName, evt2Trigger)

    triggerEvent(document.body, evtName)

    expect(evt).toHaveBeenCalled()
    expect(evt2Trigger).toHaveBeenCalled()

    visible.value = false
  })
})
