DROP INDEX "user_id_name_type_idx";--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "color" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "user_id_name_type_idx" ON "categories" USING btree ("user_id","name","type","color");