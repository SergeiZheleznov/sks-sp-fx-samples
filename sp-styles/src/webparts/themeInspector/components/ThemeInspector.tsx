import * as React from 'react';
import styles from './ThemeInspector.module.scss';
import { IThemeInspectorProps } from './IThemeInspectorProps';
import {useContext, useEffect, useState} from "react";
import {ConfigurationContext} from "../../shared/ConfigurationContext";
import * as copy from 'copy-to-clipboard';
import {SearchBox} from '@fluentui/react';
import {ColorCard} from "./ColorCard/ColorCard";

interface Color {
  color: string;
  name: string;
}

export const ThemeInspector: React.FunctionComponent<IThemeInspectorProps> = (props) => {
  const config = useContext(ConfigurationContext);
  const {semanticColors} = config.themeVariant;
  const [searchString, setSearchString] = useState<string>('');

  const onSearchBoxChanged = (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => {
    setSearchString(newValue);
  };

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    copy(event.currentTarget.dataset['color']);
  };

  const colors: Color[] = [];
  Object.keys(semanticColors).forEach((key) => {
    if (!searchString || key.toLowerCase().indexOf(searchString) !== -1){
      colors.push({
        name: key,
        color: semanticColors[key]
      });
    }
  });

  return (
    <div className={ styles.themeInspector }>
      <SearchBox placeholder="Search" underlined={true} onChange={onSearchBoxChanged} />
      <div className={styles.grid}>
        <div className={styles.row}>
          {colors.length ? colors.map((clr) => {
            return(<ColorCard color={clr.color} name={clr.name} onClickHandler={onClickHandler} />);
          }) : 'no colors'}
        </div>
      </div>
    </div>
  );
};
