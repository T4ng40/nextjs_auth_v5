-- DropIndex
DROP INDEX "verification_tokens_identifier_token_key";

-- AlterTable
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("identifier", "token");
