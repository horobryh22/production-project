import { ReactElement } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = (props: HStackProps): ReactElement => {
    return <Flex {...props} direction={'row'} />;
};
