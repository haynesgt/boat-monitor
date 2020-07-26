import {useLocalStorage} from "./useLocalStorage";
import * as bs from "react-bootstrap";
import React from "react";
import {FakeLink} from "./FakeLink";

export function CollapsibleCard<T>({storageKey, header, children}: { storageKey: string, header: any, children: JSX.Element | JSX.Element[] }) {
  const [visible, setVisible] = useLocalStorage<boolean>(storageKey, true);
  return <bs.Card style={visible ? {} : {marginBottom: 'auto'}}>
    <bs.Card.Header>
      {header}
      <FakeLink className={'float-right'} onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'Show'}
      </FakeLink>
    </bs.Card.Header>
    {
      visible ? <bs.Card.Body>{children}</bs.Card.Body> : undefined
    }
  </bs.Card>;
}