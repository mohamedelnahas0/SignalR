namespace SignalR.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Messagetext { get; set; }
        public string UserName  { get; set; }
        public DateTime MessageDate { get; set; } = DateTime.Now;

    }
}
