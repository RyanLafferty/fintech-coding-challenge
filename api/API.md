# API Docs

## Transactions (/transactions)

### Load (/load)

#### POST

##### Request

Body Structure

```
{
  id: string,
  customer_id: number,
  load_amount: string,
  time: datetime
}
```

Example:
```JSON
{
  "id":"15887",
  "customer_id":"528",
  "load_amount":"$3318.47",
  "time":"2000-01-01T00:00:00Z"
}
```

##### Response

Body Structure

```
{
  id: number,
  customer_id: number,
  accepted: boolean
}
```

Example:
```JSON
{
  "id":"15887",
  "customer_id":"528",
  "accepted":true
}
```
