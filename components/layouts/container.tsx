import { twMerge } from 'tailwind-merge';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  const baseClasses: string =
    'space-y-10 md:space-y-16 flex w-full xl:min-h-[calc(100dvh-100px)] items-center justify-center p-[50px]';

  const mergedClasses: string = twMerge([baseClasses, className]);
  return (
    <>
      {/* Content Container */}
      <div className={mergedClasses} {...props}>
        {/* Content Section */}
        {children}
      </div>
    </>
  );
};
export default Container;
