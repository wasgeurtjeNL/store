import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"
import { Check, CheckCheckIcon } from "lucide-react"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const [isValidAddress, setIsValidAddress] = useState<number>(0)

  const [validatedAddress, setValidatedAddress] = useState({
    "shipping_address.address_1": "",
    "shipping_address.postal_code": "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }))

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }))
  }

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart]) // Add cart as a dependency

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    // if (
    //   e.target.name != "shipping_address.postal_code" &&
    //   e.target.name != "shipping_address.address_1"
    // ) {
    //   console.log({ e: e.target.name })
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // } else {
    //   setValidatedAddress({
    //     ...validatedAddress,
    //     [e.target.name]: e.target.value,
    //   })
    // }
  }

  const handleValidateAddress = async () => {
    console.log("Validating address...")

    console.log({ formData })

    if (
      formData["shipping_address.postal_code"]?.length === 0 ||
      formData["shipping_address?.address_1"]?.length === 0 ||
      formData["shipping_address?.city"]?.length === 0
    ) {
      return
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_ADDRESS_VALIDATE_BASE_URL
      const apiSecret = process.env.NEXT_PUBLIC_ADDRESS_VALIDATE_API_SECRET

      console.log({ formData, baseUrl, apiSecret })

      console.log({
        postcode: formData["shipping_address.postal_code"],
        houseNumber: formData["shipping_address.address_1"].match(/\d+/)?.[0],
      })

      const response = await fetch(
        `/api/postcode?postcode=${
          formData["shipping_address.postal_code"]
        }&houseNumber=${
          formData["shipping_address.address_1"].match(/\d+/)?.[0]
        }`
      )

      const data = await response.json()

      if (response.status === 200) {
        console.log({ data })
        data.street && setIsValidAddress(1)
        // setValidatedAddress({
        //   ...validatedAddress,
        //   "shipping_address.address_1": `${data.street} ${data.houseNumber}`,
        // })
        // setFormData({
        //   ...formData,
        //   "shipping_address.postal_code":
        //     validatedAddress["shipping_address.postal_code"],
        //   "shipping_address.address_1":
        //     validatedAddress["shipping_address.address_1"],
        // })
        // Optional: Update form with normalized address data if provided by API
        if (data.street) {
          setFormData((prevData) => ({
            ...prevData,
            "shipping_address.province": `${data.street}`,
            "shipping_address.city": `${data.city}`,
            // "shipping_address.address_1": `${data.street} ${data.houseNumber}`,

            // "shipping_address.province":
            //   data.normalized_address.province ||
            //   prevData["shipping_address.province"],
          }))
        }
      } else {
        // Handle invalid address
        console.warn("Invalid address detected")
        setIsValidAddress(2)
        // setFormData({
        // ...formData,
        // "shipping_address.postal_code": "",
        // "shipping_address.address_1": "",
        // })
      }
    } catch (error) {
      console.error("Address validation failed:", error)
    }
  }

  console.log({ formData, cart })

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}
      <div className="grid grid-cols-2 gap-4 py-4">
        <Input
          label="First name"
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-first-name-input"
        />
        <Input
          label="Last name"
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"]}
          onChange={handleChange}
          required
          data-testid="shipping-last-name-input"
        />

        <Input
          label="Company"
          name="shipping_address.company"
          value={formData["shipping_address.company"]}
          onChange={handleChange}
          autoComplete="organization"
          data-testid="shipping-company-input"
        />

        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["shipping_address.country_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-country-select"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="House no"
          name="shipping_address.address_1"
          autoComplete="address-line1"
          value={formData["shipping_address.address_1"]}
          onChange={handleChange}
          required
          type="number"
          data-testid="shipping-address-input"
          onBlur={handleValidateAddress}
        />
        <Input
          label="Postal code"
          name="shipping_address.postal_code"
          autoComplete="postal-code"
          value={formData["shipping_address.postal_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-postal-code-input"
          onBlur={handleValidateAddress}
        />
      </div>
      <div className="py-4  w-full">
        {isValidAddress === 1 && (
          <div className="max-w-[300px] flex  flex-col  p-2 justify-center bg-blue-500 rounded-xl">
            <div className="flex items-center gap-2 py-1 font-semibold">
              <CheckCheckIcon className="text-white" />
              <p className="text-xs text-white">Address is valid</p>
            </div>
            <div className="text-xs flex flex-col gap-1 text-white">
              <p> City: {formData["shipping_address.city"]}</p>
              <p> Postcode: {formData["shipping_address.postal_code"]}</p>
              <p> House no: {formData["shipping_address.address_1"]}</p>
              <div className="invisible h-2">
                <Input
                  label="City"
                  name="shipping_address.city"
                  autoComplete="address-level2"
                  value={formData["shipping_address.city"]}
                  onChange={handleChange}
                  required
                  data-testid="shipping-city-input"
                />
                <Input
                  label="State / Province"
                  name="shipping_address.province"
                  autoComplete="address-level1"
                  value={formData["shipping_address.province"]}
                  onChange={handleChange}
                  data-testid="shipping-province-input"
                />
              </div>
            </div>
          </div>
        )}
        {isValidAddress === 2 && (
          <div>
            <p className="text-sm font-semibold">
              We could not find your combination of postcode and house number.
              Is it correct? Then enter your street name and city.
            </p>

            <div className="flex flex-col md:flex-row py-3 gap-4">
              <Input
                label="City"
                name="shipping_address.city"
                autoComplete="address-level2"
                value={formData["shipping_address.city"]}
                onChange={handleChange}
                required
                data-testid="shipping-city-input"
              />
              <Input
                label="State / Province"
                name="shipping_address.province"
                autoComplete="address-level1"
                value={formData["shipping_address.province"]}
                onChange={handleChange}
                data-testid="shipping-province-input"
              />
            </div>
          </div>
        )}
      </div>
      <div className="my-8">
        <Checkbox
          label="Billing address same as shipping address"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input
          label="Email"
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          data-testid="shipping-email-input"
        />
        <Input
          label="Phone"
          name="shipping_address.phone"
          autoComplete="tel"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
          data-testid="shipping-phone-input"
        />
      </div>
    </>
  )
}

export default ShippingAddress
