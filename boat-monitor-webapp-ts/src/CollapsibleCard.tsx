import {useLocalStorage} from "./useLocalStorage";
import * as bs from "react-bootstrap";
import React from "react";

export function CollapsibleCard<T>({storageKey, header, children}: { storageKey: string, header: any, children: JSX.Element }) {
  const [visible, setVisible] = useLocalStorage<boolean>(storageKey, true);
  return <bs.Card>
    <bs.Card.Header>
      {header}
      <a href={'javascript:void(0)'} className={'float-right'} onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'Show'}
      </a>
    </bs.Card.Header>
    <bs.Card.Body>
      {
        visible ? children : undefined
      }
    </bs.Card.Body>
  </bs.Card>;
}