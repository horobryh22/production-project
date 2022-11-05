import { memo, ReactElement, useCallback } from 'react';

import classes from './Code.module.scss';

import CopyIcon from 'shared/assets/icons/copy.svg';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme } from 'shared/ui';

interface CodeProps {
    className?: string;
    text: string;
    copy?: boolean;
}

export const Code = memo((props: CodeProps): ReactElement => {
    const { className, text, copy = false } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <div className={classNames(classes.Code, {}, [className])}>
            {copy && (
                <Button
                    className={classes.btn}
                    theme={ButtonTheme.CLEAR}
                    onClick={onCopy}
                >
                    <CopyIcon className={classes.icon} />
                </Button>
            )}
            <pre>
                <code>{text}</code>
            </pre>
        </div>
    );
});
