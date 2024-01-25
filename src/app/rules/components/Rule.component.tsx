export type RuleTitleProps = {
  children: React.ReactNode;
};
export const RuleTitle = (props: RuleTitleProps) => {
  const { children } = props;
  return <h4 className='font-bold uppercase'>{children}</h4>;
};

export type RuleDetailProps = {
  children: React.ReactNode;
};
export const RuleDetail = (props: RuleDetailProps) => {
  const { children } = props;
  return <p className=''>{children}</p>;
};

export type RuleExampleProps = {
  children: React.ReactNode;
};
export const RuleExample = (props: RuleExampleProps) => {
  const { children } = props;
  return (
    <p className=' ml-4 pl-4 text-left border-l-2 border-primary italic'>
      {children}
    </p>
  );
};

export type RuleProps = {
  image?: React.ReactNode;
  children: React.ReactNode | Array<React.ReactNode>;
};
const Rule = (props: RuleProps) => {
  const { image, children } = props;

  return (
    <section className='w-full max-w-lg'>
      <div className='flex flex-col lg:flex-row justify-center gap-4'>
        {/* {image && (
          <div className='flex w-1/2 justify-center items-center'>{image}</div>
        )}

        <div className='p-4 px-8 flex justify-center items-center border border-primary rounded'>
          <div className='rounded bg-primary h-16 w-16'></div>
        </div> */}
        <div className='flex flex-col justify-center text-center gap-4'>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Rule;

