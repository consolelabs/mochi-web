import React from 'react'
import { Controller } from 'react-hook-form'
import type {
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  ControllerFieldState,
} from 'react-hook-form'
import { heading } from '../Heading'

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

type Props<T extends FieldValues> = {
  label: string
  children:
    | ((p: {
        field: ControllerRenderProps<FieldValues, string>
        fieldState: ControllerFieldState
        formState: UseFormStateReturn<FieldValues>
      }) => React.ReactNode)
    | React.ReactElement<any>
  description?: React.ReactNode
} & Omit<Optional<ControllerProps<T>, 'name'>, 'render'>

export default function Field<T extends FieldValues = FieldValues>({
  label,
  description,
  children,
  control,
  name,
  ...rest
}: Props<T>) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-col">
        <label className={heading({ size: 'xs' })}>{label}</label>
        {description}
      </div>
      {!control || !name ? (
        <div>{children}</div>
      ) : (
        <Controller
          {...rest}
          name={name}
          control={control}
          render={({ field, fieldState, ...renderRest }) => {
            return (
              <div className="flex flex-col">
                {typeof children === 'function'
                  ? children({
                      field: {
                        ...field,
                        ...(fieldState.error ? { appearance: 'invalid' } : {}),
                      },
                      fieldState,
                      ...renderRest,
                    })
                  : React.isValidElement<any>(children)
                  ? React.cloneElement(children, {
                      ...children.props,
                      ...field,
                      ...fieldState,
                      ...renderRest,
                    })
                  : null}
                {fieldState.error && (
                  <span className="mt-1 text-xs text-mochi-500">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )
          }}
        />
      )}
    </div>
  )
}
