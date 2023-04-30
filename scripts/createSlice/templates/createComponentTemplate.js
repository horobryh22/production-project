const changeFirstLetter = require('../helpers/changeFirstLetter');

const replacedInterface = 'interface';

module.exports = (slice) => {
    const sliceNameUpperCase = changeFirstLetter(slice, 'upper');

    return `import { ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import classes from './${sliceNameUpperCase}.module.scss';

import { classNames } from 'shared/lib';

${replacedInterface} ${sliceNameUpperCase}Props {
    className?: string;
}

export const ${sliceNameUpperCase} = ({ className }: ${sliceNameUpperCase}Props): ReactElement => {
    const { t } = useTranslation();

    return <div className={classNames(classes.${sliceNameUpperCase}, {}, [className])}></div>;
};
`
};