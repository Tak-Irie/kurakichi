import { ExclamationIcon } from '@heroicons/react/outline';
import { FC, ReactElement, ReactNode } from 'react';

type FeedbackProps = {
  label: string;
  color: string;
  children: ReactNode;
  icon?: ReactElement;
};

export const Feedback: FC<FeedbackProps> = ({
  label = 'ラベル',
  color = 'gray',
  icon,
  children = '本文',
}) => (
  <div className={`rounded-md mt-4  bg-${color}-50 p-4 `}>
    <div className="flex">
      <div className={`flex-shrink-0 h-5 w-5 text-${color}-400`}>{icon}</div>
      <div className="ml-3">
        <h3 className={`text-sm font-medium text-${color}-800`}>{label}</h3>
        <div className={`mt-2 text-sm text-${color}-700`}>
          <p>{children}</p>
        </div>
      </div>
    </div>
  </div>
);

export const FeedbackCaution: FC<Pick<FeedbackProps, 'children'>> = ({
  children,
}) => (
  <Feedback label="Caution" color="yellow" icon={<ExclamationIcon />}>
    {children}
  </Feedback>
);
