This business rule runs on insert & update of change request when the CI changes.
-If the current CI is a Datacenter
--All CIs that have the location field of the Datacenter’s location with a status NOT Retired or In Stock
--CIs are of type Application, Hardware, or Database
-Get CIs 3 levels higher and 3 levels lower for current CI
--All CIs that are either a parent or child of the current CI with a status NOT Retired or In Stock
--CIs are of type Application, Hardware, or Database
