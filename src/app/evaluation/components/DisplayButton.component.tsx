import classNames from 'classnames';

export type DisplayButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isActive: boolean;
  };

const DisplayButton = (props: DisplayButtonProps) => {
  const { isActive, children, className, ...rest } = props;

  return (
    <button
      className={classNames(
        'btn btn-ghost',
        isActive ? 'btn-outline btn-primary' : '',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default DisplayButton;
