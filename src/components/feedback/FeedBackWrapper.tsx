import FeedBack, { FeedBackProps } from '@/components/feedback/template';
import React from 'react';

interface FeedbackWrapperProps {
  result: boolean;
  feedbackProps: FeedBackProps;
}

const FeedbackWrapper: React.FC<FeedbackWrapperProps> = ({ result, feedbackProps }) => {
  return result ? <FeedBack {...feedbackProps} /> : null;
};

export default FeedbackWrapper;