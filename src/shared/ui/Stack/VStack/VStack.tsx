import { ReactElement } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction' | 'ref'>;

export const VStack = (props: VStackProps): ReactElement => {
    const { align = 'start' } = props;

    return <Flex {...props} direction={'column'} align={align} />;
};
