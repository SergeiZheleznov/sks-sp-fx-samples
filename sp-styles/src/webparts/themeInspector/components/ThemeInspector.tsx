import * as React from 'react';
import styles from './ThemeInspector.module.scss';
import { IThemeInspectorProps } from './IThemeInspectorProps';
import {useContext} from "react";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {ConfigurationContext} from "../../shared/ConfigurationContext";
import {Stack, IconButton} from '@fluentui/react';
import * as copy from 'copy-to-clipboard';

export const ThemeInspector: React.FunctionComponent<IThemeInspectorProps> = (props) => {
  const config = useContext(ConfigurationContext);
  const {semanticColors}: IReadonlyTheme = config.themeVariant;
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    copy(event.currentTarget.dataset['color']);
  };
  return (
    <div className={ styles.themeInspector }>
      <div className={styles.grid}>
        <div className={styles.row}>
          {Object.keys(semanticColors).map(key => {
            const color = semanticColors[key];
            const style: React.CSSProperties = {
              background: color,
              borderColor: semanticColors.inputBorder,
            };
            return(
              <div className={styles.item} >
                <div className={styles.body} style={{borderColor: semanticColors.bodyDivider}}>
                  <Stack horizontal horizontalAlign={'space-between'}>
                    <Stack.Item>
                      <div className={styles.color} style={style}></div>
                      <span className={styles.name}>{key}</span>
                    </Stack.Item>
                    <Stack.Item>
                      <IconButton data-color={key} iconProps={{iconName: 'Paste'}} onClick={onClickHandler} />
                    </Stack.Item>
                  </Stack>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
