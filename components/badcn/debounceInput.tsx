/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeEvent,
  ComponentProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "../ui/input";

type Props = Omit<Omit<ComponentProps<typeof Input>, "ref">, "value"> & {
  onBounce?: (value: string) => void;
  delay?: number;
  defaultValue?: string;
};

export default function DebounceInput({
  onBounce = () => {},
  delay = 500,
  defaultValue = "",
  onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {},
  ...props
}: Props) {
  const [insValue, setInsValue] = useState(defaultValue);
  const [debValue, setDebValue] = useState(defaultValue);

  const inp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebValue(insValue), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [insValue, delay]);

  useEffect(() => {
    onBounce(debValue);
  }, [debValue, onBounce]);

  return (
    <Input
      ref={inp}
      value={insValue}
      onChange={(e) => {
        setInsValue(e.target.value);
        onChange(e);
      }}
      {...props}
    />
  );
}
