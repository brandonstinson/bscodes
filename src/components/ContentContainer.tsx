type Props = {
  children: React.ReactNode;
  title?: string;
};

export const ContentContainer = ({ children, title }: Props) => (
  <div className="grid gap-6 px-12 pb-20 justify-center justify-items-center">
    {title && <span className="text-3xl">{title}</span>}
    {children}
  </div>
);
