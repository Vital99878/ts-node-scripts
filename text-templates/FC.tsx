import style from './Component.module.scss';

type Props = {};

export default function Component(props: Props) {
  return <div {...props} style={style.wrapper}></div>;
}
