type GetNumberEnumValue<E extends number> =
  `$E` extends `$infer T extends number` ? T : never;
type GetStringEnumValue<E extends string> = `${E}`;

export type getEnumValue<E extends string | number> = E extends number
  ? GetNumberEnumValue<E>
  : GetStringEnumValue<E>;

