---
id: flow-merchant-scanner
title: Comercio · Escaneo QR
group: 02 · Flujos frontend
order: 130
parent: merchant-flows
level: flow
status: mixed
summary: La cámara es real; la identificación y actualización de saldo ocurren en memoria.
diagram: true
codeRefs: required
---

# Comercio · Escaneo QR

```mermaid
flowchart LR
    CAMERA["Expo Camera real"] --> TOKEN["QR token leído"]
    TOKEN --> HOOK["useProcessQrScan"]
    HOOK --> MOCK["processQrScan mock"]
    MOCK --> FIND["Busca cliente local"]
    FIND --> CARD["Crea o actualiza tarjeta local"]
    CARD --> MOVE["Agrega movimiento local"]
    MOVE --> RESULT["Mensaje de éxito"]

    click MOCK href "#/sequence-scan" "Ver secuencia exacta"
    click CARD href "#/data-current" "Ver estructuras mock"
```

El servicio usa sucursal `101` y tienda `1`. Sellos suma uno y reinicia a uno al superar el máximo; Puntos suma diez sin considerar importe. Estas reglas no deben trasladarse al backend objetivo.

## Referencias de código

- [Pantalla y captura](https://github.com/gonzalotev/app-fidelidad/blob/main/app/(tabs)/scanner/index.tsx#L10-L91)
- [Mutación de escaneo](https://github.com/gonzalotev/app-fidelidad/blob/main/src/features/loyalty/hooks/useLoyalty.ts#L16-L30)
- [Reglas mock](https://github.com/gonzalotev/app-fidelidad/blob/main/src/features/loyalty/services/loyaltyService.ts#L101-L147)
