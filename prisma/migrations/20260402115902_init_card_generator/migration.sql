-- CreateTable
CREATE TABLE "GameProject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "settingsJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "cardWidth" INTEGER NOT NULL DEFAULT 750,
    "cardHeight" INTEGER NOT NULL DEFAULT 1050,
    "themeJson" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Deck_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "GameProject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CardTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deckId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "layoutJson" TEXT,
    "styleJson" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CardTemplate_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TemplateFace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "templateId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "backgroundAssetId" TEXT,
    "backgroundJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TemplateFace_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "CardTemplate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TemplateFace_backgroundAssetId_fkey" FOREIGN KEY ("backgroundAssetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TemplateElement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "faceId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT,
    "type" TEXT NOT NULL,
    "contentJson" TEXT,
    "styleJson" TEXT,
    "positionJson" TEXT,
    "behaviorJson" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TemplateElement_faceId_fkey" FOREIGN KEY ("faceId") REFERENCES "TemplateFace" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deckId" TEXT NOT NULL,
    "templateId" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "metadataJson" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Card_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "CardTemplate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CardFace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "name" TEXT,
    "backgroundAssetId" TEXT,
    "backgroundJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CardFace_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CardFace_backgroundAssetId_fkey" FOREIGN KEY ("backgroundAssetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CardElement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "faceId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT,
    "type" TEXT NOT NULL,
    "valueJson" TEXT,
    "styleJson" TEXT,
    "positionJson" TEXT,
    "bindingJson" TEXT,
    "isEditable" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CardElement_faceId_fkey" FOREIGN KEY ("faceId") REFERENCES "CardFace" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "mimeType" TEXT,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "metaJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Asset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "GameProject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CardRevision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "snapshotJson" TEXT NOT NULL,
    "changeNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CardRevision_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GameProject_slug_key" ON "GameProject"("slug");

-- CreateIndex
CREATE INDEX "Deck_projectId_sortOrder_idx" ON "Deck"("projectId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Deck_projectId_slug_key" ON "Deck"("projectId", "slug");

-- CreateIndex
CREATE INDEX "CardTemplate_deckId_sortOrder_idx" ON "CardTemplate"("deckId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateFace_templateId_side_key" ON "TemplateFace"("templateId", "side");

-- CreateIndex
CREATE INDEX "TemplateElement_faceId_sortOrder_idx" ON "TemplateElement"("faceId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateElement_faceId_key_key" ON "TemplateElement"("faceId", "key");

-- CreateIndex
CREATE INDEX "Card_deckId_sortOrder_idx" ON "Card"("deckId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Card_deckId_slug_key" ON "Card"("deckId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "CardFace_cardId_side_key" ON "CardFace"("cardId", "side");

-- CreateIndex
CREATE INDEX "CardElement_faceId_sortOrder_idx" ON "CardElement"("faceId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CardElement_faceId_key_key" ON "CardElement"("faceId", "key");

-- CreateIndex
CREATE INDEX "Asset_projectId_kind_idx" ON "Asset"("projectId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "CardRevision_cardId_version_key" ON "CardRevision"("cardId", "version");
