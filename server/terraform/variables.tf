variable "node_env" {
  type        = string
  default     = "prod"
}

variable "mongo_uri" {
  type        = string
  description = "MongoDB connection URI"
  sensitive   = true
}

variable "rapid_api_key" {
  type        = string
  description = "RapidAPI Key for external API access"
  sensitive   = true
}

variable "rapid_api_host" {
  type        = string
  description = "RapidAPI Host for external API access"
}
