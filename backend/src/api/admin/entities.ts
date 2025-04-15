import { DataSource, EntityMetadata } from "typeorm";
import { Resource } from "@adminjs/sql";

// Een mapping van Medusa entiteitsnamen naar gebruiksvriendelijke namen
const ENTITY_DISPLAY_NAMES: Record<string, string> = {
  product: "Producten",
  product_collection: "Collecties",
  product_variant: "Productvarianten",
  category: "Categorieën",
  shipping_option: "Verzendopties",
  store: "Winkel",
  region: "Regio's",
  order: "Bestellingen",
  customer: "Klanten",
  discount: "Kortingen",
  gift_card: "Cadeaubonnen",
  payment: "Betalingen",
  user: "Gebruikers",
  shipping_profile: "Verzendprofielen",
  tax_rate: "Belastingtarieven",
  currency: "Valuta",
  fragrance: "Geuren", // Custom entity voor Wasgeurtje
};

// Lijst van entiteiten die uitgesloten worden van het admin panel
const EXCLUDED_ENTITIES = [
  "migrations",
  "typeorm_metadata",
  "custom_shipping_option",
  "note",
  "notification",
  "oauth",
  "staged_job",
];

/**
 * Get resources for all Medusa entities
 */
export const getMedusaResources = (dataSource: DataSource) => {
  const entities = dataSource.entityMetadatas;
  const resources = entities
    .filter((entity) => !EXCLUDED_ENTITIES.includes(entity.name.toLowerCase()))
    .map((entity) => buildResourceForEntity(entity));

  return resources;
};

/**
 * Build AdminJS resource based on entity metadata
 */
const buildResourceForEntity = (entity: EntityMetadata) => {
  const tableName = entity.tableName;
  const entityName = entity.name.toLowerCase();
  
  return {
    resource: new Resource(entity),
    options: {
      id: entityName,
      navigation: {
        name: getNavigationGroup(entityName),
        icon: getEntityIcon(entityName),
      },
      listProperties: getListProperties(entity),
      editProperties: getEditProperties(entity),
      properties: {
        // Voeg hier aangepaste property definities toe indien nodig
      },
      actions: {
        // Voeg hier aangepaste acties toe indien nodig
      },
      sort: {
        direction: "desc",
        sortBy: "created_at",
      },
    },
  };
};

/**
 * Get navigation group for entity
 */
const getNavigationGroup = (entityName: string): string => {
  if (
    ["product", "product_variant", "product_collection", "category", "fragrance"].includes(
      entityName
    )
  ) {
    return "Producten";
  }

  if (["order", "customer", "cart", "payment"].includes(entityName)) {
    return "Verkoop";
  }

  if (
    [
      "shipping_option",
      "shipping_profile",
      "fulfillment",
      "fulfillment_provider",
    ].includes(entityName)
  ) {
    return "Verzending";
  }

  if (["discount", "gift_card", "promotion"].includes(entityName)) {
    return "Marketing";
  }

  if (["user", "store", "region", "currency", "tax_rate"].includes(entityName)) {
    return "Instellingen";
  }

  return "Overig";
};

/**
 * Get icon for entity
 */
const getEntityIcon = (entityName: string): string => {
  const ENTITY_ICONS: Record<string, string> = {
    product: "Inventory",
    product_variant: "Inventory",
    product_collection: "Collection",
    category: "Folder",
    order: "Cart",
    customer: "User",
    discount: "Percent",
    gift_card: "Gift",
    shipping_option: "Truck",
    region: "Globe",
    user: "User",
    store: "Store",
    tax_rate: "Calculator",
    currency: "Dollar",
    fragrance: "Droplet", // Icon voor onze custom entity
  };

  return ENTITY_ICONS[entityName] || "Settings";
};

/**
 * Get list of properties to display in list view
 */
const getListProperties = (entity: EntityMetadata): string[] => {
  // Basis set van properties die altijd getoond moeten worden
  const baseProperties = ["id"];
  
  // Voeg naam/titel property toe als die bestaat
  const nameProperty = entity.columns.find((column) =>
    ["name", "title", "code"].includes(column.propertyName)
  );
  
  if (nameProperty) {
    baseProperties.push(nameProperty.propertyName);
  }
  
  // Voeg created_at toe als die bestaat
  if (entity.columns.some((column) => column.propertyName === "created_at")) {
    baseProperties.push("created_at");
  }

  return baseProperties;
};

/**
 * Get list of properties to display in edit form
 */
const getEditProperties = (entity: EntityMetadata): string[] => {
  // Exclude standard metadata fields
  const excludedProps = [
    "created_at",
    "updated_at",
    "deleted_at",
    "metadata",
  ];

  return entity.columns
    .filter((column) => !excludedProps.includes(column.propertyName))
    .map((column) => column.propertyName);
}; 