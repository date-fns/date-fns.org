import { FunctionComponent, ComponentType, JSX } from 'preact'

type CSSComponentProps<TAdditionalProps = {}> = {
  tag?: keyof JSX.IntrinsicElements
} & Omit<JSX.HTMLAttributes<any>, keyof TAdditionalProps> & Omit<JSX.SVGAttributes<any>, keyof TAdditionalProps> & TAdditionalProps

type CSSPreactComponentProps<
  TPreactComponent extends ComponentType<any>,
  TAdditionalProps = {}
> = { tag: TPreactComponent } & (TPreactComponent extends ComponentType<
  infer Props
>
  ? Omit<Props, 'tag'>
  : {}) &
  TAdditionalProps

export type CSSComponent<TAdditionalProps = {}> = FunctionComponent<
  CSSComponentProps<TAdditionalProps>
>

export type CSSPreactComponent<
  TPreactComponent extends FunctionComponent<any>,
  TAdditionalProps = {}
> = FunctionComponent<
  CSSComponentProps<TAdditionalProps> |
  CSSPreactComponentProps<TPreactComponent, TAdditionalProps>
>
