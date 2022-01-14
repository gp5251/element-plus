import { h, provide } from 'vue'
import { NOOP } from '@vue/shared'
import { mount } from '@vue/test-utils'
import { ElButton } from '@element-plus/components'
import {
  formContextKey,
  formItemContextKey,
  buttonGroupContextKey,
} from '@element-plus/tokens'

import type {
  ElFormContext,
  FormItemContext,
  ButtonGroupContext,
} from '@element-plus/tokens'

const AXIOM = 'Rem is the best girl'

const Component = {
  render() {
    return h(ElButton, this.$attrs, {
      default: () => [AXIOM],
    })
  },
}

const mountComponent = (setup = NOOP, options = {}) => {
  return mount(
    {
      ...Component,
      setup,
    },
    options
  )
}

describe('use-form-item', () => {
  it('should return local value', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.el-button--default').exists()).toBe(true)
  })

  it('should return props.size instead of injected.size', () => {
    const propSize = 'small'
    const wrapper = mountComponent(
      () => {
        provide(formItemContextKey, {
          size: 'large',
        } as FormItemContext)
      },
      {
        props: {
          size: propSize,
        },
      }
    )

    expect(wrapper.find(`.el-button--${propSize}`).exists()).toBe(true)
  })

  it('should return fallback.size instead inject.size', () => {
    const fallbackSize = 'small'
    const wrapper = mountComponent(() => {
      provide(buttonGroupContextKey, {
        size: fallbackSize,
      } as ButtonGroupContext)

      provide(formItemContextKey, {
        size: 'large',
      } as FormItemContext)
    })

    expect(wrapper.find(`.el-button--${fallbackSize}`).exists()).toBe(true)
  })

  it('should return formItem.size instead form.size', () => {
    const itemSize = 'small'
    const wrapper = mountComponent(() => {
      provide(formItemContextKey, {
        size: itemSize,
      } as FormItemContext)

      provide(formContextKey, {
        size: 'large',
      } as ElFormContext)
    })

    expect(wrapper.find(`.el-button--${itemSize}`).exists()).toBe(true)
  })
})
